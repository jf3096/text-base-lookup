import {Pattern} from 'fast-glob/out/types/patterns';
import * as path from 'path';

/**
 * 标准化 pattern
 * @param patterns - 模式
 * @param contextDirectory - 环境路径
 */
export default function normalizePatterns(patterns: Pattern | Pattern[], contextDirectory: string): Pattern[] {
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
