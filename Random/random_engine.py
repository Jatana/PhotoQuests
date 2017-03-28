from random import randint, choice

def random_id():
	alphabet = [chr(i) for i in range(ord('a'), ord('z') + 1)] + \
				[chr(i) for i in range(ord('A'), ord('Z') + 1)] + \
				 [chr(i) for i in range(ord('0'), ord('9') + 1)]
	rez = ''.join([choice(alphabet) for i in range(128)])
	return rez

def random_id_no_coll(db):
	rid = random_id()
	while db.filter(eid=rid):
		rid = random_id()
	return rid


if __name__ == '__main__':
	print(random_id())

