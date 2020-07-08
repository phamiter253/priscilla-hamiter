from csv import writer
from csv import reader

with open('C:\\Users\\cilla\\ramenr.csv', 'r', encoding="utf8") as fin, open('ramen.csv', 'w', newline='', encoding="utf8") as fout:

      # define reader and writer objects
      csv_reader = reader(fin, skipinitialspace=True)
      csv_writer = writer(fout, delimiter=',')

      # write headers
      csv_writer.writerow(next(csv_reader))

      # iterate and write rows based on condition
      for i in csv_reader:
        if i[2] == 'Bowl' or i[2] == 'Cup' or i[2] == 'Pack':
          csv_writer.writerow(i)