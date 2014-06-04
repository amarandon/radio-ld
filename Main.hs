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
    createDirectoryIfMissing True "output"
    B.writeFile "output/fmr.json" json
