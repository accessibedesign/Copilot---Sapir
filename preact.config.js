const fs = require('fs')
const webpack = require('webpack')
const path = require('path')

export default function (config, env, helpers) {
  //The index of the scss loader
  const ruleIndex = config.module.rules.findIndex((rule) => rule.test.test('.scss'))

  //Adding raw-loader to the end of the scss loader pipeline
  config.module.rules[ruleIndex].use.unshift('raw-loader')

  //Removing style-loader rules
  config.module.rules = config.module.rules.filter((rule) => !rule.test.test('.css'))

  //The index of the SVG Loader
  const SVGruleIndex = config.module.rules.findIndex((rule) => rule.test.test('file.svg'))

  // replace url-loader with raw-loader for svg files in order to inline them
  config.module.rules[SVGruleIndex].loader = 'raw-loader'

  config.resolve.alias['~'] = path.resolve(__dirname, 'src')
}
