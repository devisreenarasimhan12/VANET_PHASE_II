import traci
import sumolib
import math
import random
from collections import defaultdict
import csv
import os
import sys


SUMO_CFG = "city.sumocfg"
COMM_RANGE = 130
SIM_STEPS = 500     

SCOUT_PREFIX = "scout"
AMB_PREFIX = "amb"
TRUE_ALERT_PROB = 0.7


def dist(a,b): return math.dist(a,b)
def is_scout(v): return v.startswith(SCOUT_PREFIX)


messages = {}
heard = defaultdict(set)
rsu_buffer = []
hq_buffer = []
msg_counter = 0

total_alerts = 0
true_alerts = 0
delivered_alerts = 0
dispatch_total = 0
dispatch_correct = 0
delays = []


def log(x):
    print(x)
    sys.stdout.flush()


def create_alert(sender, pos):
    global msg_counter, total_alerts, true_alerts

    mid = f"M{msg_counter}"
    msg_counter += 1

    real = random.random() < TRUE_ALERT_PROB
    if real:
        true_alerts += 1

    messages[mid] = {
        "source": sender,
        "pos": pos,
        "time": traci.simulation.getTime(),
        "real": real
    }

    heard[mid].add(sender)
    total_alerts += 1

    log(f"[ALERT] {mid} from {sender} REAL={real}")
    return mid



def main():

    global delivered_alerts, dispatch_total, dispatch_correct

    sumo = sumolib.checkBinary("sumo")
    traci.start([sumo, "-c", SUMO_CFG])

    try:
        while traci.simulation.getTime() < SIM_STEPS:

            traci.simulationStep()
            t = traci.simulation.getTime()

            vehicles = traci.vehicle.getIDList()
            positions = {v: traci.vehicle.getPosition(v) for v in vehicles}

            # Scouts detect victims
            for v in vehicles:
                if is_scout(v) and random.random() < 0.01:
                    create_alert(v, positions[v])

            # Broadcast
            for mid, info in messages.items():
                for v in vehicles:

                    if v in heard[mid]:
                        continue

                    if dist(info["pos"], positions[v]) < COMM_RANGE:
                        heard[mid].add(v)
                        log(f"[RX] {v} received {mid}")
                        rsu_buffer.append(mid)

            # RSU Forward
            while rsu_buffer:
                mid = rsu_buffer.pop(0)
                delivered_alerts += 1
                hq_buffer.append(mid)
                log(f"[RSU] forwarded {mid} to HQ")

            # HQ Dispatch
            while hq_buffer:
                mid = hq_buffer.pop(0)
                info = messages[mid]
                delay = t - info["time"]
                delays.append(delay)

                dispatch_total += 1
                if info["real"]:
                    dispatch_correct += 1

                log(f"[HQ] DISPATCH for {mid} delay={delay:.1f}s")


    finally:
        # ALWAYS RUNS
        try:
            traci.close()
        except:
            pass

        log("\n========== METRICS ==========")

        delivery = delivered_alerts/total_alerts if total_alerts else 0
        delay = sum(delays)/len(delays) if delays else 0
        precision = dispatch_correct/dispatch_total if dispatch_total else 0
        recall = dispatch_correct/true_alerts if true_alerts else 0
        f1 = 2*precision*recall/(precision+recall) if precision+recall else 0

        log(f"Total Alerts     : {total_alerts}")
        log(f"Real Alerts      : {true_alerts}")
        log(f"Delivered to HQ  : {delivered_alerts}")
        log(f"Delivery Ratio   : {delivery:.2f}")
        log(f"Avg Delay (sec)  : {delay:.2f}")
        log(f"Precision        : {precision:.2f}")
        log(f"Recall           : {recall:.2f}")
        log(f"F1 Score         : {f1:.2f}")
        log("================================\n")


        #### CSV EXPORT ####

        filename = "metrics.csv"
        write_header = not os.path.exists(filename)

        with open(filename, "a", newline="") as f:
            w = csv.writer(f)

            if write_header:
                w.writerow([
                    "SIM_TIME",
                    "Total Alerts",
                    "Real Alerts",
                    "Delivered",
                    "Delivery Ratio",
                    "Avg Delay",
                    "Precision",
                    "Recall",
                    "F1"
                ])

            w.writerow([
                SIM_STEPS,
                total_alerts,
                true_alerts,
                delivered_alerts,
                round(delivery,3),
                round(delay,3),
                round(precision,3),
                round(recall,3),
                round(f1,3)
            ])




if __name__ == "__main__":
    main()
