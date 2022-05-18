import pandas as pd


def is_register_file(df):
    standard_culomns = ['Account','Fullname','Ispl','Isno','Father','Type','NationalId','Birthday','Serial','Firstname','Lastname']
    cheack_culomns = (df.columns == standard_culomns)
    


