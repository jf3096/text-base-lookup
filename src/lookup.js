"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fg = require("fast-glob");
const isBinaryFile = require("isbinaryfile");
const es6_promisify_1 = require("es6-promisify");
const normalize_patterns_1 = require("./normalize-patterns");
const isBinaryFilePromise = es6_promisify_1.promisify(isBinaryFile);
/**
 * 查询文件
 * @param {Pattern | Pattern[]} patterns - 路径模式, e.g. lib/**
 * @param {string} workingDirectory - 工作区目录
 */
function lookup(patterns, workingDirectory = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        patterns = normalize_patterns_1.default(patterns, workingDirectory);
        const entries = yield fg.async(patterns);
        const list = yield Promise.all(entries
            .map((entry) => __awaiter(this, void 0, void 0, function* () {
            const isBinary = yield isBinaryFilePromise(entry);
            return { entry: entry, isBinary };
        })));
        return list.reduce((result, { entry, isBinary }) => {
            isBinary ? result.binary.push(entry) : result.text.push(entry);
            return result;
        }, { binary: [], text: [] });
    });
}
exports.default = lookup;
//# sourceMappingURL=lookup.js.map