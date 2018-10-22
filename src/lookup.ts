import * as fg from 'fast-glob';
import * as isBinaryFile from 'isbinaryfile';
import {promisify} from 'es6-promisify';
import {Pattern} from 'fast-glob/out/types/patterns';
import normalizePatterns from './normalize-patterns';

const isBinaryFilePromise = promisify(isBinaryFile);

export interface ILookupResult {
  binary: string[];
  text: string[];
}

/**
 * 查询文件
 * @param {Pattern | Pattern[]} patterns - 路径模式, e.g. lib/**
 * @param {string} workingDirectory - 工作区目录
 */
export default async function lookup(patterns: Pattern | Pattern[], workingDirectory = process.cwd()): Promise<ILookupResult> {
  patterns = normalizePatterns(patterns, workingDirectory);
  const entries = await fg.async(patterns);
  const list = await Promise.all(
    entries
      .map(async (entry) => {
        const isBinary = await (isBinaryFilePromise as any)(entry);
        return {entry: entry as string, isBinary};
      })
  );
  return list.reduce((result: ILookupResult, {entry, isBinary}) => {
    isBinary ? result.binary.push(entry) : result.text.push(entry);
    return result;
  }, {binary: [], text: []} as ILookupResult);
}
