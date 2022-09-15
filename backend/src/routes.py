from flask import request
from cachelib import MemcachedCache

cache = MemcachedCache(['memcached:11211'])

def test():
    print("Set: " + request.form['name'] + " as a value of 'key' | " + str(cache.set('key', request.form['name'], 0)))
    print("Value: " + cache.get('key'))
    return "It's me, Flask"
