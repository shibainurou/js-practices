import inquirer from "inquirer";
import { MemoRepository } from "./MemoRepository.js";
import { MemoEntity } from "./MemoEntity.js";

export class MemoService {
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
      console.log(memo.title);
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
    console.log(memo.title);
    console.log(memo.content);
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
