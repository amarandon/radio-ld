module Main where

import qualified Stations.FMR as FMR
import Data.Aeson (encode)
import Program (printPrograms)
import Data.Aeson.Encode.Pretty (encodePretty)
import qualified Data.ByteString.Lazy as B
import System.Directory (createDirectoryIfMissing)

main = do
    contents <- readFile "data/fmr.html"
    let json = encodePretty $ FMR.programs contents
        outputFile = "output/fmr.json"
    createDirectoryIfMissing True "output"
    putStrLn $ "Writing file " ++ outputFile
    B.writeFile outputFile json
