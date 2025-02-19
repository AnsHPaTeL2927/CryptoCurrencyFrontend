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
    const handleGetStarted = () => {
        window.location.href = "/register";
    };

    const handleLearnMore = () => {
        window.location.href = "/learn";
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Hero Section */}
            <AnimatedSection className="hero min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
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
                        <div className="absolute -inset-4 bg-blue-600/20 rounded-2xl blur-2xl"></div>
                        <div className="relative z-10 shadow-2xl rounded-2xl overflow-hidden border-4 border-gray-800">
                            <img
                                src="public/hero image 2.jpg"
                                alt="Cryptocurrency Trading Chart"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay"></div>
                        </div>
                    </motion.div>

                    {/* Hero Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                        >
                            Trade Smarter, Not Harder
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl text-gray-300"
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
                            <button
                                onClick={handleGetStarted}
                                className="btn bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Start Trading
                            </button>
                            <button
                                onClick={handleLearnMore}
                                className="btn btn-outline border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>
            {/* Features Section */}
            <AnimatedSection className="py-24 bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
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
                                    className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 group"
                                >
                                    <div className="text-center">
                                        <div className="mb-4 inline-block p-4 bg-blue-900/30 rounded-full group-hover:bg-blue-900/50 transition-all duration-300">
                                            <Icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-blue-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">{feature.description}</p>
                                        <ul className="text-left text-gray-500 space-y-2">
                                            {feature.details.map((detail, detailIndex) => (
                                                <li key={detailIndex} className="flex items-center">
                                                    <Activity className="w-4 h-4 mr-2 text-blue-500" />
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
            <AnimatedSection className="py-24 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-6 text-white"
                    >
                        Transform Your Trading Strategy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
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
                        className="btn bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-full text-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
                    >
                        Create Your Account
                    </motion.button>
                </div>
            </AnimatedSection>
            {/* Why Choose Us Section */}
            <AnimatedSection className="py-24 bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Why Choose CryptoTrader?
                    </motion.h2>
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
                                    className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 group"
                                >
                                    <div className="text-center">
                                        <div className="mb-4 inline-block p-4 bg-blue-900/30 rounded-full group-hover:bg-blue-900/50 transition-all duration-300">
                                            <Icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-blue-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">{feature.description}</p>
                                        <ul className="text-left text-gray-500 space-y-2">
                                            {feature.details.map((detail, detailIndex) => (
                                                <li key={detailIndex} className="flex items-center">
                                                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
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
            <AnimatedSection className="py-24 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-white">
                                24/7 Expert Support
                            </h2>
                            <p className="text-xl text-gray-300 mb-6">
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
                                            className="flex items-center bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900/70 transition-all duration-300"
                                        >
                                            <div className="mr-4 p-3 bg-blue-900/30 rounded-full">
                                                <Icon className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-blue-300">
                                                    {support.title}
                                                </h4>
                                                <p className="text-gray-400">{support.description}</p>
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
                                className="mt-6 btn bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
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
                                <div className="absolute -inset-4 bg-blue-600/20 rounded-2xl blur-2xl"></div>
                                <div className="relative z-10 bg-gray-900 rounded-2xl p-8 shadow-2xl">
                                    <div className="flex justify-center mb-6">
                                        <div className="p-4 bg-blue-900/30 rounded-full">
                                            <ShieldCheck className="w-12 h-12 text-blue-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-center mb-4 text-blue-300">
                                        Dedicated Support Team
                                    </h3>
                                    <ul className="space-y-3 text-gray-400">
                                        <li className="flex items-center">
                                            <Zap className="w-5 h-5 mr-2 text-blue-500" />
                                            Instant Chat Support
                                        </li>
                                        <li className="flex items-center">
                                            <Globe className="w-5 h-5 mr-2 text-blue-500" />
                                            Multilingual Support
                                        </li>
                                        <li className="flex items-center">
                                            <Activity className="w-5 h-5 mr-2 text-blue-500" />
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
