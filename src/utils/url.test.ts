import { describe, it, expect, beforeEach } from 'vitest';
import { getGuest } from './url';

describe('getGuest', () => {
    beforeEach(() => {
        window.history.pushState({}, 'Test Page', '/');
    });

    it('returns the invite code when query param exists', () => {
        const testUrl = '/?invite=alan_ava';
        window.history.pushState({}, 'Test Page', testUrl);

        const result = getGuest();
        expect(result).toBe('alan_ava');
    });

    it('returns null when invite query param is missing', () => {
        window.history.pushState({}, 'Test Page', '/');

        const result = getGuest();
        expect(result).toBeNull();
    });
});