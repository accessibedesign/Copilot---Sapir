import glob from "glob";
import useTranslationClass from "../../src/hooks/useTranslation";
import * as fs from "fs";

const jsonStringFiles = glob.sync( "../../src/**/locale/en.json").map(path => fs.readFileSync(path));
const dictionary = jsonStringFiles.reduce((acc, item)=> ({...acc, ...item}), {});

useTranslationClass.setDictionary(dictionary);