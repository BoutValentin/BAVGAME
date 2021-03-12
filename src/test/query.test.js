import {
	Query,
	API_KEY,
	METACRITIC,
	PAGE_SIZE,
	DATE_RELEASE,
	PAGE,
} from '../query';

const queryDefault = `key=${API_KEY}&metacritic=${METACRITIC}&page_size=${PAGE_SIZE}&pages=${PAGE}&dates=${
	DATE_RELEASE +
	`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(
		-2
	)}-${('0' + new Date().getDate()).slice(-2)}`
}`;
const expected = {
	'test emptyQuery': queryDefault,
	'One query add': queryDefault + '&platforms=4',
	'One query multiple value': queryDefault + '&platforms=4,5',
};

test('Empty Query should be equals to only key', () => {
	const query = new Query();
	expect(query.getStringQuery()).toBe(expected['test emptyQuery']);
});

test('Add parameter to query which not present', () => {
	const query = new Query();
	query.addOneParameter('platforms', '4');
	expect(query.getStringQuery()).toBe(expected['One query add']);
});

test('Add parameter to query which is present', () => {
	const query = new Query();
	query.addOneParameter('platforms', '4');
	query.addOneParameter('platforms', '4');
	expect(query.getStringQuery()).toBe(expected['One query add']);
});

test('Add parameter to query which already have one', () => {
	const query = new Query();
	query.addOneParameter('platforms', '4');
	query.addOneParameter('platforms', '5');
	expect(query.getStringQuery()).toBe(expected['One query multiple value']);
});

test('Readd parameter to query which already have one', () => {
	const query = new Query();
	query.addOneParameter('platforms', '4');
	query.addOneParameter('platforms', '5');
	query.addOneParameter('platforms', '4');
	expect(query.getStringQuery()).toBe(expected['One query multiple value']);
});

test('Remove parameter to query which already have one', () => {
	const query = new Query();
	query.addOneParameter('platforms', '5');
	query.addOneParameter('platforms', '4');
	query.removeOneParameter('platforms', '5');
	expect(query.getStringQuery()).toBe(expected['One query add']);
});

test('Remove parameter to query which is present', () => {
	const query = new Query();
	query.addOneParameter('platforms', '4');
	query.removeOneParameter('platforms', '4');
	expect(query.getStringQuery()).toBe(expected['test emptyQuery']);
});

test('Adding parameter by replacement', () => {
	const query = new Query();
	query.addOneParameter('platforms', '5');
	query.addOneParameter('platforms', '4', true);
	expect(query.getStringQuery()).toBe(expected['One query add']);
});
