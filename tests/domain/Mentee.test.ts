import { describe, it, expect } from 'vitest';
import { Mentee } from '../../src/core/domain/Mentee';

describe('Mentee Domain Entity', () => {
    describe('constructor', () => {
        it('should create a mentee with given properties', () => {
            // Arrange
            const menteeData = {
                id: 1,
                name: 'John',
                lastName: 'Doe',
                title: 'Software Engineer',
                mobile: '1234567890',
                userId: 1
            };

            // Act
            const mentee = new Mentee(menteeData);

            // Assert
            expect(mentee.id).toBe(menteeData.id);
            expect(mentee.name).toBe(menteeData.name);
            expect(mentee.lastName).toBe(menteeData.lastName);
            expect(mentee.title).toBe(menteeData.title);
            expect(mentee.mobile).toBe(menteeData.mobile);
            expect(mentee.userId).toBe(menteeData.userId);
        });
    });

    describe('getFullName', () => {
        it('should return the full name of the mentee', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const fullName = mentee.getFullName();

            // Assert
            expect(fullName).toBe('John Doe');
        });
    });

    describe('getContactInfo', () => {
        it('should return the contact information', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const contactInfo = mentee.getContactInfo();

            // Assert
            expect(contactInfo).toBe('John Doe - 1234567890');
        });
    });

    describe('getTitle', () => {
        it('should return the title when it exists', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                title: 'Software Engineer',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const title = mentee.getTitle();

            // Assert
            expect(title).toBe('Software Engineer');
        });

        it('should return default text when title is not specified', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const title = mentee.getTitle();

            // Assert
            expect(title).toBe('No title specified');
        });
    });

    describe('getDisplayString', () => {
        it('should include title when it exists', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                title: 'Software Engineer',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const displayString = mentee.getDisplayString();

            // Assert
            expect(displayString).toBe('John Doe (Software Engineer)');
        });

        it('should not include title parentheses when title is not specified', () => {
            // Arrange
            const mentee = new Mentee({
                name: 'John',
                lastName: 'Doe',
                mobile: '1234567890',
                userId: 1
            });

            // Act
            const displayString = mentee.getDisplayString();

            // Assert
            expect(displayString).toBe('John Doe');
        });
    });
}); 