const slugify = require('./slugify')

test('branch with underscores', () => {
  expect(slugify('branch_with_underscores')).toBe('branch-with-underscores')
})

test('branch with periods', () => {
  expect(slugify('branch_with_periods')).toBe('branch-with-periods')
})

test('branch with non-letter at beginning', () => {
  expect(slugify('_branch')).toBe('branch')
})

test('branch with non-letter at end', () => {
  expect(slugify('branch_')).toBe('branch')
})

test('branch with capital letter', () => {
  expect(slugify('Branch')).toBe('branch')
})

test('branch longer than 63 characters', () => {
  expect(slugify('branch-with-name-longer-than-63-characters-xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'))
    .toBe('branch-with-name-longer-than-63-characters-xxxxxxxxxx-xxxxxxxxx')
})

test('branch longer than 63 characters that ends with hyphen', () => {
  expect(slugify('branch-with-name-longer-than-63-characters-xxxxxxxxxx-xxxxxxxxx-xxxxxxxxxx'))
    .toBe('branch-with-name-longer-than-63-characters-xxxxxxxxxx-xxxxxxxxx')
})
