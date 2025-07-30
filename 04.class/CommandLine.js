export class CommandLine {
  constructor(argv) {
    this.args = argv;
    this.optionLine = argv.slice(2);
  }

  option() {
    return this.optionLine[0] || null;
  }

  async readInputUntilEOF() {
    return new Promise((resolve) => {
      const param = [];
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
