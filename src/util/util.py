import string
import random

# Source: https://stackoverflow.com/questions/13484726/safe-enough-8-character-short-unique-random-string
def gen_hash(length): 
    alphabet = string.ascii_lowercase + string.digits
    return ''.join(random.choices(alphabet, k=length))
