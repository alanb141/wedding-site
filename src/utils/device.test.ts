import { describe, it, expect, vi } from 'vitest';
import { isMobile } from './device';

describe('isMobile', () => {
    it('returns true if width is 768px or less', () => {
        vi.stubGlobal('innerWidth', 512);
        expect(isMobile()).toBe(true);
    });

    it('returns false if width is greater than 768px', () => {
        vi.stubGlobal('innerWidth', 1024);
        expect(isMobile()).toBe(false);
    });
});