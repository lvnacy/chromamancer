## Installation Guide
Welcome to the arcane arts. To begin your journey with **Chromamancer**, follow the instructions below to set up the CLI on your machine.

### Prerequisites
Before installing, ensure you have the following installed on your system:
  * **Node.js**: Version 18.x or higher.
  * **pnpm**: Recommended for local development and managing workspace dependencies.

### Global Installation
For most users, installing the CLI globally is the easiest way to access the chromamancer command from any directory.

```Bash
# Using npm
npm install -g @chromamancer/cli

# Using pnpm (Recommended)
pnpm add -g @chromamancer/cli
```

### Local Development Setup
If you want to contribute to the project or run the latest version from the source, follow these steps:

#### 1. Clone the repository:

```Bash
git clone https://github.com/lvnacy/chromamancer.git
cd chromamancer
```

#### 2. Install dependencies: Chromamancer uses a monorepo structure. Install all package dependencies using pnpm:

```Bash
pnpm install
```

#### 3. Build the project: Compile the TypeScript source code into executable JavaScript:

```Bash
pnpm run build
```

#### 4. Link for development: To test the chromamancer command locally as you make changes:

```Bash
cd packages/cli
pnpm link --global
```

### Verification
To verify the installation was successful, run:

```Bash
chromamancer --version
```
You should see output indicating version **0.1.0**.