export interface Client {
    id?: number;
    name: string;
    email: string;
    address: string;
    gender?: 'Male' | 'Female' | 'Other';
    born_date: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}
export interface Report {
    id: number,
    client_id: number,
    user_id: number,
    report_date: string,
    summary: string,
    active: number,
    tests?: string[],
    user?: string,
    created_at: string,
    updated_at: string
}
export interface Test {
    id?: number,
    name: string,
    description: string,
    quantity: number,
    unlimited?: number,
    created_at?: string,
    updated_at?: string
}
export interface ClientTest {
    id?: number,
    report_id: string,
    test_id: string,
    test_date: string,
    result: string,
    created_at?: string,
    updated_at?:string,
}
export interface User {
    id?: number,
    name: string,
    username: string,
    email: string,
    phone: string,
    admin?: string,
    email_verified_at?: string,
    password?: string,
    remember_token?: string,
    created_at?: string,
    updated_at?: string
}
export interface CredentialsInput {
    email: string;
    password: string;
}
export type ValidationErrors = {
    password?: string;
    email?: string;
    title?: string;
    amount?: string;
    date?: string;
};
export interface SignupInput {
    email: string;
    password: string;
}
export interface UserAndReport {
    reports: Report[],
}
export interface ReportFormProps {
    method: "post" | "put",
    client: Client,
    clientID: string,
    reportID: string,
    userID: string,
    token: string,
    isSubmitting?: boolean,
}
export interface TestFormProps{
    report_id?: string,
    testPassed?: Test,
    tests: Test[],
    error?: Record<string, string>, 
    isSubmitting?: boolean,
}
export interface TestsFormProps{
    test?: Test,
    error?: { errors?: Record<string, string> },
    isSubmitting?: boolean,
}
export interface ClientReportsProps{
    reports: Report[],
    clientInfo: Client,
    owner?: string,
    isSubmitting?: boolean,
} 
export interface UserFormProps {
    user?: User,
    error?: { errors?: Record<string, string> };
    isSubmitting?: boolean;
}