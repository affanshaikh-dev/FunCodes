#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_NAME 100
#define MAX_PASSWORD 50
#define MAX_ACCOUNTS 100
#define FILENAME "accounts.dat"
#define TRANSACTION_LOG "transactions.log"

// Account structure
typedef struct {
    int accountNumber;
    char name[MAX_NAME];
    char password[MAX_PASSWORD];
    float balance;
} Account;

// Function prototypes
void menu();
void createAccount();
Account* login();
void viewAccount();
void deposit();
void withdraw();
void transfer();
void viewTransactions();
void logTransaction(int accountNumber, const char *type, float amount);
int countAccounts();

int main() {
    menu();
    return 0;
}

// Display the main menu
void menu() {
    int choice;
    do {
        printf("\n--- Welcome to Boyz Bank ---\n");
        printf("1. Create Account\n2. View Account\n3. Deposit\n4. Withdraw\n");
        printf("5. Transfer\n6. View Transactions\n7. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: createAccount(); break;
            case 2: viewAccount(); break;
            case 3: deposit(); break;
            case 4: withdraw(); break;
            case 5: transfer(); break;
            case 6: viewTransactions(); break;
            case 7: printf("Thanks for using our bank\nExiting...\n"); break;
            default: printf("Invalid choice.\n");
        }
    } while (choice != 7);
}

// Count the number of accounts in the file
int countAccounts() {
    FILE *file = fopen(FILENAME, "rb");
    if (!file) return 0; // File doesn't exist
    fseek(file, 0, SEEK_END);
    int size = ftell(file);
    fclose(file);
    return size / sizeof(Account);
}

// Create a new account
void createAccount() {
    if (countAccounts() >= MAX_ACCOUNTS) {
        printf("Maximum account limit reached.\n");
        return;
    }
    Account acc;
    acc.accountNumber = 1000 + countAccounts(); // Generate unique account number
    printf("Account number (auto-generated): %d\n", acc.accountNumber);
    printf("Enter full name: ");
    getchar(); // Clear newline
    fgets(acc.name, MAX_NAME, stdin);
    acc.name[strcspn(acc.name, "\n")] = '\0'; // Remove trailing newline
    printf("Enter password: ");
    scanf("%s", acc.password);
    do {
        printf("Enter initial balance: ");
        scanf("%f", &acc.balance);
        if (acc.balance < 0) {
            printf("Balance cannot be negative.\n");
        }
    } while (acc.balance < 0);
    FILE *file = fopen(FILENAME, "ab");
    if (file) {
        fwrite(&acc, sizeof(Account), 1, file);
        fclose(file);
        printf("Account created successfully.\n");
        logTransaction(acc.accountNumber, "Account Created", acc.balance);
    } else {
        printf("Error opening file.\n");
    }
}

// Login function to validate account
Account* login() {
    static Account acc;
    int accNum;
    char pass[MAX_PASSWORD];
    FILE *file = fopen(FILENAME, "rb");
    if (!file) {
        printf("Error opening file.\n");
        return NULL;
    }
    printf("Enter account number: ");
    scanf("%d", &accNum);
    printf("Enter password: ");
    scanf("%s", pass);
    while (fread(&acc, sizeof(Account), 1, file)) {
        if (acc.accountNumber == accNum && strcmp(acc.password, pass) == 0) {
            fclose(file);
            return &acc;
        }
    }
    printf("Invalid account number or password.\n");
    fclose(file);
    return NULL;
}

// View account details
void viewAccount() {
    Account *acc = login();
    if (acc) {
        printf("Account Number: %d\nName: %s\nBalance: %.2f\n",
                acc->accountNumber, acc->name, acc->balance);
    }
}

// Deposit money into an account
void deposit() {
    Account *acc = login();
    if (!acc) return;
    float amount;
    printf("Enter deposit amount: ");
    scanf("%f", &amount);
    acc->balance += amount;
    FILE *file = fopen(FILENAME, "r+b");
    if (file) {
        fseek(file, -sizeof(Account), SEEK_CUR);
        fwrite(acc, sizeof(Account), 1, file);
        fclose(file);
        printf("Deposit successful. New balance: %.2f\n", acc->balance);
        logTransaction(acc->accountNumber, "Deposit", amount);
    } else {
        printf("Error opening file.\n");
    }
}

// Withdraw money from an account
void withdraw() {
    Account *acc = login();
    if (!acc) return;
    float amount;
    printf("Enter withdrawal amount: ");
    scanf("%f", &amount);
    if (acc->balance >= amount) {
        acc->balance -= amount;
        FILE *file = fopen(FILENAME, "r+b");
        if (file) {
            fseek(file, -sizeof(Account), SEEK_CUR);
            fwrite(acc, sizeof(Account), 1, file);
            fclose(file);
            printf("Withdrawal successful. New balance: %.2f\n", acc->balance);
            logTransaction(acc->accountNumber, "Withdrawal", amount);
        } else {
            printf("Error opening file.\n");
        }
    } else {
        printf("Insufficient funds.\n");
    }
}

// Transfer money between accounts
void transfer() {
    Account *fromAcc = login();
    if (!fromAcc) return;
    int toAccNum;
    float amount;
    printf("Enter destination account number: ");
    scanf("%d", &toAccNum);
    printf("Enter transfer amount: ");
    scanf("%f", &amount);
    if (fromAcc->balance >= amount) {
        fromAcc->balance -= amount;
        FILE *file = fopen(FILENAME, "r+b");
        if (file) {
            // Update sender's balance
            fseek(file, -sizeof(Account), SEEK_CUR);
            fwrite(fromAcc, sizeof(Account), 1, file);

            // Update recipient's balance
            Account toAcc;
            int found = 0;
            rewind(file); // Move file pointer to beginning
            while (fread(&toAcc, sizeof(Account), 1, file)) {
                if (toAcc.accountNumber == toAccNum) {
                    toAcc.balance += amount;
                    fseek(file, -sizeof(Account), SEEK_CUR);
                    fwrite(&toAcc, sizeof(Account), 1, file);
                    found = 1;
                    break;
                }
            }
            fclose(file);
            if (found) {
                printf("Transfer successful.\n");
                logTransaction(fromAcc->accountNumber, "Transfer Out", amount);
                logTransaction(toAccNum, "Transfer In", amount);
            } else {
                printf("Destination account not found.\n");
            }
        } else {
            printf("Error opening file.\n");
        }
    } else {
        printf("Insufficient funds in sender's account.\n");
    }
}

// View transactions for a specific account
void viewTransactions() {
    int accNum;
    char line[256];
    printf("Enter account number: ");
    scanf("%d", &accNum);
    FILE *file = fopen(TRANSACTION_LOG, "r");
    if (!file) {
        printf("No transactions found.\n");
        return;
    }
    printf("Transactions for account %d:\n", accNum);
    char accNumStr[20];
    sprintf(accNumStr, "%d", accNum);
    while (fgets(line, sizeof(line), file)) {
        if (strstr(line, accNumStr)) { // Check for account number in each line
            printf("%s", line);
        }
    }
    fclose(file);
}

// Log transactions
void logTransaction(int accountNumber, const char *type, float amount) {
    FILE *file = fopen(TRANSACTION_LOG, "a");
    if (file) {
        time_t now = time(NULL);
        fprintf(file, "Account: %d | Type: %s | Amount: %.2f | Date: %s",
                accountNumber, type, amount, ctime(&now));
        fclose(file);
    }
}
