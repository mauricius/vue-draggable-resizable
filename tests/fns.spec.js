import { describe, it, expect } from 'vitest'
import { isFunction, snapToGrid } from '@/utils/fns'

describe('fns', () => {

  describe('isFunction', () => {

    it('should return false if a String is provided', () => {
      expect(isFunction('test')).to.be.false
    })

    it('should return false if a Number is provided', () => {
      expect(isFunction(123)).to.be.false
    })

    it('should return false if a Boolean is provided', () => {
      expect(isFunction(true)).to.be.false
    })

    it('should return false if a null is provided', () => {
      expect(isFunction(null)).to.be.false
    })

    it('should return true if a function is provided', () => {
      expect(isFunction(() => {})).to.be.true
    })
  })

  describe('snapToGrid', () => {

    it('should snap exactly to the size of the grid', () => {
      expect(snapToGrid([1, 1], 0, 0)).to.deep.equal([0, 0])
      expect(snapToGrid([1, 1], 1, 1)).to.deep.equal([1, 1])
    })

    it('should snap exactly to the size of the grid', () => {
      expect(snapToGrid([5, 5], 0, 0)).to.deep.equal([0, 0])
      expect(snapToGrid([5, 5], 1, 1)).to.deep.equal([0, 0])
      expect(snapToGrid([5, 5], 2, 2)).to.deep.equal([0, 0])
      expect(snapToGrid([5, 5], 3, 3)).to.deep.equal([5, 5])
      expect(snapToGrid([5, 5], 4, 4)).to.deep.equal([5, 5])
      expect(snapToGrid([5, 5], 5, 5)).to.deep.equal([5, 5])
    })
  })
})
