"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * 标准化 pattern
 * @param patterns - 模式
 * @param contextDirectory - 环境路径
 */
function normalizePatterns(patterns, contextDirectory) {
    if (!Array.isArray(patterns)) {
        patterns = [patterns];
    }
    return patterns.map((pattern) => {
        if (!path.isAbsolute(pattern)) {
            return path.resolve(contextDirectory, pattern);
        }
        return pattern;
    });
}
exports.default = normalizePatterns;
//# sourceMappingURL=normalize-patterns.js.map