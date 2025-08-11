# Terra & Brews: A Modern E-commerce Coffee Shop

This is a full-stack e-commerce web application for a local coffee shop, Terra & Brews. The project is built with Next.js and TypeScript, and it uses Appwrite as a backend. It features a complete shopping experience, from browsing products to a secure checkout process with Paystack.

## Features

*   **Modern & Responsive Design:** A visually appealing and user-friendly interface built with Tailwind CSS, ensuring a seamless experience across all devices.
*   **Complete E-commerce Functionality:** Browse products, add items to the cart, and complete purchases through a secure checkout process.
*   **Product Management:** The application fetches product information from a GraphQL API, allowing for easy management of the coffee menu.
*   **Secure Payments:** Integration with Paystack for secure and reliable payment processing.
*   **User Authentication:** Secure user authentication and session management using Appwrite.
*   **Modular Architecture:** The frontend is built with a modular component-based architecture, making it easy to maintain and scale.

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:** [Appwrite](https://appwrite.io/)
*   **Payment Gateway:** [Paystack](https://paystack.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Headless UI](https://headlessui.dev/)
*   **Form Management:** [Zod](https://zod.dev/)
*   **API Communication:** [GraphQL](https://graphql.org/)

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/coffee-website-client.git
    cd coffee-website-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```
    NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
    NEXT_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage

*   **Browsing Products:** Navigate to the "Menu" page to see the list of available coffee products.
*   **Adding to Cart:** Click the "Add to Cart" button on a product to add it to your shopping cart.
*   **Checkout:** Go to the cart page and proceed to checkout. Fill in your shipping and payment details to complete the order.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the existing code style and conventions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

