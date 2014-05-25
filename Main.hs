module Main where
import Text.HTML.TagSoup


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


printProg :: [Tag String] -> IO ()
printProg prog = do
    putStrLn "*****************************"
    putStrLn $ "Day: " ++ (spanContent "dayTitle" prog)
    putStrLn $ "Hour: " ++ (spanContent "hourTitle" prog)
    putStrLn $ "Title: " ++ (progTitle $ titleSection prog)
    putStrLn $ "Type: " ++ (progType $ titleSection prog)



main = do
    contents <- readFile "data/fmr.html"
    let tags = parseTags contents
        progList = partitions isProgramSection tags
    mapM_ printProg progList
