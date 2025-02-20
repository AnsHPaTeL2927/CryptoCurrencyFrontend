/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
    Zap,
    ShieldCheck,
    Globe,
    Clock,
    TrendingUp,
    Cpu,
    BarChart2,
    Activity,
} from "lucide-react";
import { useTheme } from "../pages/context/themeContext";
// Reusable Animation Wrapper Component
const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const Home = () => {
    const { theme } = useTheme();

    const handleGetStarted = () => {
        window.location.href = "/register";
    };

    const handleLearnMore = () => {
        window.location.href = "/learn";
    };

    return (
        <div
            className={`min-h-screen bg-base-100 text-base-content overflow-hidden ${theme}`}
        >
            {/* Hero Section */}
            <AnimatedSection className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4">
                    {/* Trading Chart Image Container */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            rotate: -5,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="w-full md:w-1/2 mb-8 lg:mb-0 lg:mr-12 relative"
                    >
                        <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl"></div>
                        <div className="relative z-10 shadow-2xl rounded-2xl overflow-hidden border-4 border-base-300">
                            <img
                                src="public/hero image 2.jpg"
                                alt="Cryptocurrency Trading Chart"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 mix-blend-overlay"></div>
                        </div>
                    </motion.div>

                    {/* Hero Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl font-bold text-primary"
                        >
                            Trade Smarter, Not Harder
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl text-base-content/70"
                        >
                            Unlock the power of advanced cryptocurrency trading with real-time
                            insights, AI-driven analysis, and seamless execution.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex space-x-4"
                        >
                            <button onClick={handleGetStarted} className="btn btn-primary">
                                Start Trading
                            </button>
                            <button onClick={handleLearnMore} className="btn btn-outline">
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Features Section */}
            <AnimatedSection className="py-24 bg-base-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-primary">
                        Advanced Trading Tools
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Lightning Speed",
                                description: "Instant trade execution with minimal latency",
                                details: [
                                    "Sub-millisecond order processing",
                                    "Advanced trading algorithms",
                                    "High-frequency trading support",
                                ],
                            },
                            {
                                icon: ShieldCheck,
                                title: "Ironclad Security",
                                description: "Military-grade protection for your assets",
                                details: [
                                    "Multi-layer encryption",
                                    "Cold storage integration",
                                    "Continuous security monitoring",
                                ],
                            },
                            {
                                icon: BarChart2,
                                title: "Comprehensive Analytics",
                                description: "Deep insights for informed trading decisions",
                                details: [
                                    "Real-time market analysis",
                                    "Advanced charting tools",
                                    "Performance tracking",
                                ],
                            },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 120,
                                    }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="card-body text-center">
                                        <div className="mb-4 inline-block self-center p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                                            <Icon className="w-10 h-10 text-primary group-hover:text-primary-focus transition-colors" />
                                        </div>
                                        <h3 className="card-title self-center text-base-content text-xl font-bold group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base-content/70 mb-4 group-hover:text-base-content transition-colors">
                                            {feature.description}
                                        </p>
                                        <ul className="text-left text-base-content/60 group-hover:text-base-content/80 space-y-2 transition-colors">
                                            {feature.details.map((detail, detailIndex) => (
                                                <li key={detailIndex} className="flex items-center">
                                                    <Activity className="w-4 h-4 mr-2 text-primary group-hover:text-primary-focus transition-colors" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </AnimatedSection>

            {/* Call to Action */}
            <AnimatedSection className="py-24 bg-base-300">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-6 text-base-content"
                    >
                        Transform Your Trading Strategy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto"
                    >
                        Join thousands of traders leveraging cutting-edge technology to
                        maximize their cryptocurrency investment potential.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 120,
                        }}
                        onClick={handleGetStarted}
                        className="btn btn-primary px-8 py-3 rounded-full text-lg"
                    >
                        Create Your Account
                    </motion.button>
                </div>
            </AnimatedSection>

            {/* Why Choose Us Section */}
            <AnimatedSection className="py-24 bg-base-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-primary">
                        Why Choose CryptoTrader?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Global Market Access",
                                description:
                                    "Trade across multiple exchanges and cryptocurrencies with a single platform",
                                details: [
                                    "300+ cryptocurrencies",
                                    "20+ global exchanges",
                                    "Real-time global market data",
                                ],
                            },
                            {
                                icon: Cpu,
                                title: "Advanced Technology",
                                description:
                                    "Cutting-edge AI and machine learning-powered trading tools",
                                details: [
                                    "Predictive market analysis",
                                    "Automated trading strategies",
                                    "Real-time risk assessment",
                                ],
                            },
                            {
                                icon: ShieldCheck,
                                title: "Uncompromised Security",
                                description:
                                    "Military-grade protection for your digital assets",
                                details: [
                                    "Multi-layer encryption",
                                    "Cold storage integration",
                                    "Continuous security monitoring",
                                ],
                            },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 120,
                                    }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="card-body text-center">
                                        <div className="mb-4 inline-block self-center p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                                            <Icon className="w-10 h-10 text-primary group-hover:text-primary-focus transition-colors" />
                                        </div>
                                        <h3 className="card-title self-center text-base-content text-xl font-bold group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base-content/70 mb-4 group-hover:text-base-content transition-colors">
                                            {feature.description}
                                        </p>
                                        <ul className="text-left text-base-content/60 group-hover:text-base-content/80 space-y-2 transition-colors">
                                            {feature.details.map((detail, detailIndex) => (
                                                <li key={detailIndex} className="flex items-center">
                                                    <TrendingUp className="w-4 h-4 mr-2 text-primary group-hover:text-primary-focus transition-colors" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </AnimatedSection>

            {/* 24/7 Customer Support Section */}
            <AnimatedSection className="py-24 bg-base-300">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-base-content">
                                24/7 Expert Support
                            </h2>
                            <p className="text-xl text-base-content/70 mb-6">
                                Our dedicated support team is always ready to assist you,
                                ensuring a smooth and confident trading experience.
                            </p>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Clock,
                                        title: "Round-the-Clock Assistance",
                                        description: "Get help anytime, anywhere",
                                    },
                                    {
                                        icon: Activity,
                                        title: "Instant Problem Resolution",
                                        description: "Quick and effective support solutions",
                                    },
                                ].map((support, index) => {
                                    const Icon = support.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                            className="flex items-center bg-base-100 p-4 rounded-lg hover:bg-base-200 transition-all duration-300"
                                        >
                                            <div className="mr-4 p-3 bg-primary/10 rounded-full">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-base-content">
                                                    {support.title}
                                                </h4>
                                                <p className="text-base-content/70">
                                                    {support.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 120,
                                }}
                                className="mt-6 btn btn-primary"
                            >
                                Contact Support
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="w-full max-w-md relative">
                                <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl"></div>
                                <div className="relative z-10 bg-base-100 rounded-2xl p-8 shadow-2xl">
                                    <div className="flex justify-center mb-6">
                                        <div className="p-4 bg-primary/10 rounded-full">
                                            <ShieldCheck className="w-12 h-12 text-primary" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-center mb-4 text-base-content">
                                        Dedicated Support Team
                                    </h3>
                                    <ul className="space-y-3 text-base-content/70">
                                        <li className="flex items-center">
                                            <Zap className="w-5 h-5 mr-2 text-primary" />
                                            Instant Chat Support
                                        </li>
                                        <li className="flex items-center">
                                            <Globe className="w-5 h-5 mr-2 text-primary" />
                                            Multilingual Support
                                        </li>
                                        <li className="flex items-center">
                                            <Activity className="w-5 h-5 mr-2 text-primary" />
                                            Technical Expertise
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

export default Home;
