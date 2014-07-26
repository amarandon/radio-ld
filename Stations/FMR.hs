module Stations.FMR where

import Program
import Text.HTML.TagSoup as TagSoup
import Data.Char (isDigit)
import Data.List (isInfixOf)
import Debug.Trace (trace)

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

progTimes :: String -> (String, String)
progTimes string =
    let parts = words string
    in (parts !! 0, parts !! 2)

isFortnightly :: String -> Bool
isFortnightly string = (length $ words string) > 3

makeProgram :: [Tag String] -> Program
makeProgram progTag =
    let
        timeString = (spanContent "hourTitle" progTag)
        (startTime, endTime) = progTimes timeString
    in
        Program {
            day = (spanContent "dayTitle" progTag)
          , startTime = startTime
          , endTime = endTime
          , fortnightly = (isFortnightly timeString)
          , title = (progTitle $ titleSection progTag)
          , genre = (progType $ titleSection progTag)
        }

programs :: String -> [Program]
programs contents =
    let tags = TagSoup.parseTags contents
        progList = TagSoup.partitions isProgramSection tags
    in
    map makeProgram progList
