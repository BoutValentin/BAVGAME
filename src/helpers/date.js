const MONTH = [
	'Janvier',
	'Fevrier',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Aout',
	'Septembre',
	'Octobre',
	'Novembre',
	'Decembre',
];

const Day = [
	'Lundi',
	'Mardi',
	'Mercredi',
	'Jeudi',
	'Vendredi',
	'Samedi',
	'Dimanche',
];

export function toDisplayDate(released) {
	if (!released) return '';
	const date = new Date(released);
	return `${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}`;
}
