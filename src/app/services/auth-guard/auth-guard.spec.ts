import { TestBed } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ UrlSerializer ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
