import * as core from '@actions/core'
import * as github from '@actions/github'
import action from './action'

try{
  action().then(output => {
    core.setOutput('issues', output)
  })
}catch(err){
  core.setFailed(err.message)
}