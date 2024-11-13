import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { exec, spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class CodeExecutionGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log(`${client.id} successfully connected`);
  }

  @SubscribeMessage('exec')
  async handleExecute(
    @MessageBody() body: { files: { filename: string; content: string }[] },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { files } = body;

    if (!files) {
      throw new WsException('Нет файлов');
    }

    if (!files.some((file) => file.filename === 'main.py')) {
      throw new WsException('Нет главного файла');
    }

    const execDir = path.join(__dirname, `exec_${Date.now()}`);
    const execDirName = path.basename(execDir);

    fs.mkdirSync(execDir);

    await Promise.all(
      files.map(async (file) => {
        const { filename, content } = file;
        const filePath = path.join(execDir, filename);
        await fs.promises.writeFile(filePath, content);
      }),
    );

    let mainFile = 'main.py';

    try {
      spawn('docker', ['cp', execDir, 'code_executor:/code_executor']);

      const { stdout, stderr, stdin } = spawn('docker', [
        'exec',
        '-i',
        'code_executor',
        'python3',
        `/code_executor/${execDirName}/${mainFile}`,
      ]);

      stderr.on('data', (data) => {
        client.emit('output', {
          output: null,
          error: data.toString(),
        });
      });

      stdout.on('data', (data) => {
        client.emit('output', {
          output: data.toString(),
          error: null,
        });
      });

      stdout.on('close', (code) => {
        if (code)
          client.emit('output', {
            output: `Process exit with code ${code}.`,
            error: null,
          });
      });

      client.on('input', (data: string) => {
        stdin.write(data + '\n');
        stdin.end();
      });
    } catch (e) {
      throw new WsException((e as Error).message);
    } finally {
      spawn('docker', [
        'exec',
        'code_executor',
        'rm',
        '-rf',
        '/code_executor/*',
      ]);
    }
  }
}
