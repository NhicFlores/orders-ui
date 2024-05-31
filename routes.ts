// welcome page 
export const Landing = {
  label: "Glass Ordering",
  href: "/",
};

export const DashboardRoute = {
  label: "Dashboard",
  href: "/dashboard",
};

// lookup routes
export const QuoteRoute = {
  label: "Quotes",
  href: "/quote",
};

export const NewOrderRoute = {
  label: "New Order",
  href: "/order/new_order",
};

/*
export const EditOrderRoute = {
  label: "Edit Order",
  href: 
}
*/

export const OrderRoute = {
  label: "Orders",
  href: "/order",
};

export const DraftRoute = {
  label: "Drafts",
  href: "/drafts",
};

// product routes
export const GlassTypeRoute = {
  label: "Glass Type",
  href: "/glass-type",
};

export const ShapeRoute = {
    label: "Shape",
    href: "/shape",
  };

  export const DimensionRoute = {
    href: "/dimensions",
  };

  export const TintRoute = {
    href: "/tint",
  };

export const ProfileRoute = {
    label: "Profile",
    href: "/profile",
  };

export const BillingRoute = {
    label: "Billing",
    href: "/billing",
  };

// header routes 
export const HeaderRoutes = [
  {
    label: "Quotes",
    href: "/quote",
  },
  {
    label: "Orders",
    href: "/order",
  },
  {
    label: "Drafts",
    href: "/drafts",
  },
];

//dashboard nav links
export const DashboardNavLinks = [
  {
    label: "New Order",
    href: GlassTypeRoute.href,
  },
  {
    label: "Check Order Status",
    href: "/order",
  },
  {
    label: "Browse Templates",
    href: "/browse_templates",
  },
];

// public routes 
export const TemplatesRoute = {
  label: "Browse Templates",
  href: "/browse_templates",
};

// auth routes 
export const LoginRoute = {
  label: "Login",
  href: "/auth/login",
};

export const RegisterRoute = {
  label: "Register",
  href: "/auth/register",
};

/**
 * an array of routes that are accessible to the public 
 * these routes do not require authentication 
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/browse_templates",
]

/**
 * an array of routes that are inaccessible to the public 
 * these routes require authentication 
 * @type {string[]}
 */
export const privateRoutes = [
    "/profile",
    "/quote",
    "/order",
    "/drafts",
    "/dashboard",
]

/**
 * an array of routes used for authentication
 * these routes will redirect logged in users to /settings 
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * The prefix for API authentication routes 
 * routes that start with this prefix are used 
 * for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after logging in 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"

//make either home or dashboard. dashboard will pull recent orders 
//there isn't much need for a landing page once logged in 