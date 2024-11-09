import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class CodeExecutionGateway {
  @WebSocketServer() io: Server;

  @SubscribeMessage('exec')
  async handleExecute(
    @MessageBody() body: { files: { filename: string; content: string }[] },
    client: Socket,
  ): Promise<void> {
    const { files } = body;

    if (!files) {
      throw new WsException('Нет файлов');
    }

    if (!files.some((file) => file.filename === 'main.py')) {
      throw new WsException('Нет главного файла');
    }

    const execDir = path.join(__dirname, `exec_${Date.now()}`);

    fs.mkdirSync(execDir);

    await Promise.all(
      files.map(async (file) => {
        const { filename, content } = file;
        const filePath = path.join(execDir, filename);
        await fs.promises.writeFile(filePath, content); // Asynchronously write file
      }),
    );

    let mainFile = 'main.py';

    try {
      spawn('docker', ['cp', execDir, 'code_executor:/code_executor']);

      const { stdout, stderr } = spawn('docker', [
        'exec',
        'code_executor',
        'python3',
        `/code_executor/${mainFile}`,
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
    } catch (e) {
      throw new WsException((e as Error).message);
    } finally {
      spawn('docker', ['exec', 'code_executor', 'rm', '-rf', '/code_executor']);
    }
  }
}
