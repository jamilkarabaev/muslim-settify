"""Match the 11 'not needed' WhatsApp images to wins/ counterparts via multi-hash comparison."""
from pathlib import Path
from PIL import Image
import imagehash

NOT_NEEDED_DIR = Path(r"C:/Users/ibrah/OneDrive/Bilder/muslim settify not needed")
WINS_DIR = Path(r"C:/Users/ibrah/muslim-settify-landingpage/public/wins")

def multi_hash(p, size=16):
    img = Image.open(p)
    return {
        "p": imagehash.phash(img, hash_size=size),
        "d": imagehash.dhash(img, hash_size=size),
        "a": imagehash.average_hash(img, hash_size=size),
        "w": imagehash.whash(img, hash_size=size),
    }

def combined_dist(a, b):
    return (a["p"] - b["p"]) + (a["d"] - b["d"]) + (a["a"] - b["a"]) + (a["w"] - b["w"])

print("Hashing not-needed...")
nn = {f.name: multi_hash(f) for f in sorted(NOT_NEEDED_DIR.iterdir()) if f.is_file()}

print("Hashing wins...")
wins = {f.name: multi_hash(f) for f in sorted(WINS_DIR.iterdir()) if f.is_file()}

print(f"\n{len(nn)} not-needed, {len(wins)} wins\n")
print("Top 3 matches per not-needed image (combined hamming, lower=more similar):\n")

for nname, nh in nn.items():
    ranked = sorted((combined_dist(nh, wh), wname) for wname, wh in wins.items())
    print(f"{nname}")
    for dist, wname in ranked[:3]:
        print(f"   {dist:4d}  {wname}")
    print()
