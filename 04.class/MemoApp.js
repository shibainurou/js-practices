#! /usr/bin/env node

import { MemoService } from "./MemoService.js";
import { CommandLine } from "./CommandLine.js";

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
      } else {
        console.log(e);
      }
    } finally {
      await memo.close();
    }
  }
}

(async () => {
  const memoApp = new MemoApp();
  await memoApp.run();
})();
