import * as core from '@actions/core'
import * as path from 'path'
import * as eslint from 'eslint'

export type CoreApi = Pick<typeof core,'getInput'>

export interface ActionParams {
  linterConfigPath: string
  linterPattern: string
}

export function getActionParams(coreApi:CoreApi):ActionParams {
  return {
    linterConfigPath: coreApi.getInput('linter-config-path'),
    linterPattern: coreApi.getInput('linter-include-pattern'),
  }
}

export default async function action (params:ActionParams = getActionParams(core)) {
  const linterConfig = path.resolve(params.linterConfigPath);
  const lint =new eslint.ESLint({
    overrideConfigFile: linterConfig
  });
  const results = await lint.lintFiles(params.linterPattern)
  console.log('RESULTS:', results);
  return `${results.length} issues`
}