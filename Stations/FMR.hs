module Stations.FMR where

import Program
import Text.HTML.TagSoup as TagSoup

isProgramSection :: Tag String -> Bool
isProgramSection tag = (tag ~== "<div class=progLeft>") || (tag ~== "<div class=progRight>")

titleSection :: [Tag String] -> [Tag String]
titleSection tags = (partitions (~== "<p class=progTitle>") tags) !! 0

spanContent :: String -> [Tag String] -> String
spanContent className tags = 
    innerText $ take 1 $ filter isTagText parts
    where parts = head (partitions (~== ("<span class=" ++ className)) tags)

progTitle :: [Tag String] -> String
progTitle tags = innerText $ take 1 $ drop 1 tags

progType :: [Tag String] -> String
progType tags = innerText $ take 1 $ drop 5 tags


makeProgram :: [Tag String] -> Program
makeProgram progTag = Program {
    day = (spanContent "dayTitle" progTag)
  , time = (spanContent "hourTitle" progTag)
  , title = (progTitle $ titleSection progTag)
  , genre = (progType $ titleSection progTag)
}

programs :: String -> [Program]
programs contents =
    let tags = TagSoup.parseTags contents
        progList = TagSoup.partitions isProgramSection tags
    in
    map makeProgram progList
