mongoimport -h localhost -d bonddata -c bonds --type tsv --file "c:\temp\microstrategyPOCData\BAMLExtract\bonds.csv" --columnsHaveTypes --fields "Run_Date.date_ms(yyyy-MM-dd),Ticker.string(),Cusip.string(),IssuerName.string(),Coupon.double(),Maturity.date_ms(yyyy-MM-dd),FaceValue.double(),ParentSector.string(),Sector.string(),Country.string(),Region.string(),LatestDuration.double(),LatestPrice.double(),LatestOAS.double(),LatestWeight.double(),LatestYield.double()" --parseGrace skipRow