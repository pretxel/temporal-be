/**
 * Mentee domain entity interface
 * Represents a mentee in the system
 */
export interface IMentee {
    id?: number;
    name: string;
    lastName: string;
    title?: string | null;
    mobile: string;
    userId: number;
}

/**
 * Mentee domain entity class implementation
 * Provides business logic methods for mentees
 */
export class Mentee implements IMentee {
    id?: number;
    name: string;
    lastName: string;
    title?: string | null;
    mobile: string;
    userId: number;

    constructor(props: IMentee) {
        this.id = props.id;
        this.name = props.name;
        this.lastName = props.lastName;
        this.title = props.title;
        this.mobile = props.mobile;
        this.userId = props.userId;
    }

    /**
     * Get the full name of the mentee
     * @returns Full name (name + lastName)
     */
    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    }

    /**
     * Get formatted contact information
     * @returns Formatted contact info
     */
    getContactInfo(): string {
        return `${this.getFullName()} - ${this.mobile}`;
    }

    /**
     * Get professional title with fallback
     * @returns Title or 'No title specified'
     */
    getTitle(): string {
        return this.title ?? 'No title specified';
    }

    /**
     * Get a formatted display string
     * @returns A string representation of the mentee
     */
    getDisplayString(): string {
        return `${this.getFullName()}${this.title ? ` (${this.title})` : ''}`;
    }
}

/**
 * Mentee creation attributes
 * Used when creating a new mentee without an ID
 */
export type MenteeCreationAttributes = Omit<IMentee, 'id'>;

/**
 * Mentee update attributes
 * Used when updating a mentee - all fields are optional
 */
export type MenteeUpdateAttributes = Partial<MenteeCreationAttributes>; 