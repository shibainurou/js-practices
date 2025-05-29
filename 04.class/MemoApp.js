#! /usr/bin/env node

import inquirer from "inquirer";
import { MemoRepository } from "./MemoRepository.js";
import { MemoEntity } from "./MemoEntity.js";

class MemoApp {
  async run() {
    let isExitPrompt = false;
    const commandline = new CommandLine(process.argv);
    const memo = new MemoService();
    await memo.initialize();

    try {
      switch (commandline.option()) {
        case "-l":
          await memo.showTitleList();
          break;

        case "-r":
          await memo.showContent();
          break;

        case "-d":
          await memo.delete();
          break;

        default: {
          const lines = await commandline.readInputUntilEOF();
          await memo.add(lines);
          break;
        }
      }
    } catch (e) {
      if (e instanceof Error && e.name === "ExitPromptError") {
        // noop; silence this error
        isExitPrompt = true;
      } else {
        console.log(e);
      }
    } finally {
      if (!isExitPrompt) {
        await memo.close();
      }
    }
  }
}

class MemoService {
  async initialize() {
    this.memoRepository = new MemoRepository();
    await this.memoRepository.initialize();
  }

  async add(lines) {
    if (lines.length === 0) {
      console.log("メモを入力してください。");
      return;
    } else if (lines.length === 1) {
      lines.push("");
    }

    const title = lines[0];
    const content = lines.slice(1).join("\n");

    const memoEntity = new MemoEntity(null, title, content);
    await this.memoRepository.insert(memoEntity);
    console.log("メモを追加しました");
  }

  async showTitleList() {
    const memos = await this.memoRepository.findAll();
    if (memos.length === 0) {
      console.log("メモはありません");
      return;
    }

    console.log("=== メモ一覧 ===");
    memos.forEach((memo) => {
      console.log(`${memo.title}`);
    });
  }

  async showContent() {
    const memos = await this.memoRepository.findAll();
    if (memos.length === 0) {
      console.log("メモはありません");
      return;
    }

    const selectedMemo = await this.selectMemo(
      memos,
      "表示するメモを選択してください",
    );

    const memo = memos.find((m) => m.id === selectedMemo.id);
    console.log("=== メモ詳細 ===");
    console.log(`${memo.title}`);
    console.log(`${memo.content}`);
  }

  async delete() {
    const memos = await this.memoRepository.findAll();
    if (memos.length === 0) {
      console.log("メモはありません");
      return;
    }

    const selectedMemo = await this.selectMemo(
      memos,
      "削除するメモを選択してください",
    );

    const memo = memos.find((m) => m.id === selectedMemo.id);
    await this.memoRepository.delete(memo.id);
    console.log("メモを削除しました");
  }

  async selectMemo(memos, message) {
    return await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: message,
        choices: memos.map((memo) => ({
          name: memo.title,
          value: memo.id,
        })),
      },
    ]);
  }

  async close() {
    await this.memoRepository.close();
  }
}
class CommandLine {
  constructor(argv) {
    this.args = argv;
    this.optionLine = argv.slice(2);
  }

  option() {
    return this.optionLine[0] || null;
  }

  async readInputUntilEOF() {
    return new Promise((resolve) => {
      let param = [];
      const readable = process.stdin;
      readable.setEncoding("utf8");
      readable.on("readable", () => {
        let chunk;
        while (null !== (chunk = readable.read())) {
          param.push(chunk.trim());
        }
      });
      readable.on("end", () => {
        resolve(param);
      });
    });
  }
}

const memoApp = new MemoApp();
memoApp.run();
