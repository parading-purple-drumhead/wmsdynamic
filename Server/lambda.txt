import pymysql
import sys
from datetime import datetime, timedelta
REGION = 'ap-south-1'

rds_host  = "water.c5pp9bkmcuw1.ap-south-1.rds.amazonaws.com"
name = "admin"
password = "admin123"
db_name = "water"

def lambda_handler(event,context):
    """
    This function fetches content from mysql RDS instance
    """
    result = []
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    with conn.cursor() as cur:
        x = float(event['flow'])
        if x!=0:
            x=x/60
            #ft=round(x,1)
            tme=datetime.now()
            if(tme.hour==18 and tme.minute==30 and tme.second==00):
                cur.execute("""insert into water(tap_id,Total,tnd) values('%s','%s','%s')""" % (event['Tap_id'],str(0), tme))
                cur.execute("""INSERT INTO water1 (tap_id, Building, Floor)SELECT * FROM (SELECT '%s' AS tm, '%s' AS ab, '%s' AS bc) as tmp WHERE NOT EXISTS (SELECT tap_id FROM water.water1 WHERE tap_id = '%s' and Building='%s' and Floor='%s')""" % (event['Tap_id'],event['Building'],event['Floor'],event['Tap_id'],event['Building'],event['Floor']))
            else:
                cur.execute("""insert into water(tap_id,Total,tnd) values('%s','%s','%s')""" % (event['Tap_id'], str(x), tme))
                cur.execute("""INSERT INTO water1 (tap_id, Building, Floor)SELECT * FROM (SELECT '%s' AS tm, '%s' AS ab, '%s' AS bc) as tmp WHERE NOT EXISTS (SELECT tap_id FROM water.water1 WHERE tap_id = '%s' and Building='%s' and Floor='%s')""" % (event['Tap_id'],event['Building'],event['Floor'],event['Tap_id'],event['Building'],event['Floor']))
            #+timedelta(hours=5.5)
            cur.execute("""select * from water""")
            conn.commit()
            cur.close()
        for row in cur:
            result.append(list(row))
        print(result)
# def main(event, context):