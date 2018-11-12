import sinon from 'sinon'

import { isActive, isSuspended, needsReactivating, isAdmin } from 'utils/auth'

describe('auth utils', () => {
  describe('isActive', () => {
    test('should return true if user has one of user, admin, * roles', () => {
      expect(isActive(['user', 'something else'])).toBe(true)
      expect(isActive(['admin', 'something else'])).toBe(true)
      expect(isActive(['*', 'something else'])).toBe(true)
    })

    test('should return false if no user roles found', () => {
      expect(isActive(['no match', 'something else'])).toBe(false)
    })
  })

  describe('isSuspended', () => {
    test('should return true if user has "suspended_user" roles', () => {
      expect(isSuspended(['suspended_user', 'something else'])).toBe(true)
    })

    test('should return false if user has no "suspended_user"', () => {
      expect(isSuspended(['no match', 'something else'])).toBe(false)
    })
  })

  describe('needsReactivating', () => {
    test('should return true if user has "cancelled_user" roles', () => {
      expect(needsReactivating(['cancelled_user', 'something else'])).toBe(true)
    })

    test('should return false if user has no "cancelled_user"', () => {
      expect(needsReactivating(['no match', 'something else'])).toBe(false)
    })
  })

  describe('isAdmin', () => {
    test('should return true if user has "admin" or "*" roles', () => {
      expect(isAdmin(['view_recipes', 'something else'])).toBe(false)
      expect(isAdmin(['admin', 'something else'])).toBe(true)
      expect(isAdmin(['*', 'something else'])).toBe(true)
    })

    test('should return false if user has no "view_recipes" or "*" roles', () => {
      expect(isAdmin(['no match', 'something else'])).toBe(false)
    })
  })
})
