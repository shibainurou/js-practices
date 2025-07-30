import { Database } from "./database.js";
import { MemoEntity } from "./MemoEntity.js";

export class MemoRepository {
  async initialize() {
    this.database = new Database();
    await this.database.open();
    await this.database.createTable();
  }

  async findAll() {
    const memos = await this.database.run(
      "SELECT id, title, content FROM memos ORDER BY id",
    );
    return memos.map(
      ({ id, title, content }) => new MemoEntity(id, title, content),
    );
  }

  async findById(id) {
    const [memo] = await this.database.run(
      "SELECT id, title, content FROM memos WHERE id = ? ORDER BY id",
      [id],
    );
    return new MemoEntity(memo.id, memo.title, memo.content);
  }

  async insert(memo) {
    await this.database.run(
      "INSERT INTO memos (title, content) VALUES (?, ?)",
      [memo.title, memo.content],
    );
  }

  async delete(id) {
    await this.database.run("DELETE FROM memos WHERE id = ?", [id]);
  }

  async close() {
    await this.database.close();
  }
}
