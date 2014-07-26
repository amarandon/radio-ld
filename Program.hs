{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}
module Program where
import Data.Aeson (ToJSON)
import GHC.Generics

data Program = Program {
     day :: String
   , startTime :: String
   , endTime :: String
   , fortnightly :: Bool
   , title :: String
   , genre :: String
} deriving (Show, Generic)


instance ToJSON Program


printProgram :: Program -> IO ()
printProgram program = do
    putStrLn "*****************************"
    putStrLn $ "Day: " ++ (day program)
    putStrLn $ "Start time: " ++ (show (startTime program))
    putStrLn $ "End time: " ++ (show (endTime program))
    putStrLn $ "Fortnighly: " ++ (show (fortnightly program))
    putStrLn $ "Title: " ++ (title program)
    putStrLn $ "Type: " ++ (genre program)

printPrograms :: [Program] -> IO ()
printPrograms = mapM_ printProgram
