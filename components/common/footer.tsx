import { motion } from "framer-motion";
import { FileText, Zap, Star, ArrowRight, Heart, Twitter, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { MotionButton, MotionDiv } from "./motion-wrapper";



export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-2xl"></div>
      </div>

      <MotionDiv
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Brand & CTA */}
          <MotionDiv variants={itemVariants} className="space-y-8">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Gistly
                </h2>
              </div>
              <p className="text-xl text-purple-100 leading-relaxed">
                Transform PDFs into concise summaries
              </p>
              <p className="text-gray-300 text-lg">
                Get a beautiful summary reel of the document in seconds.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Try Gistly Now</h3>
              </div>
              <p className="text-gray-300">
                Watch how Gistly transforms your Next.js course PDF into an easy-to-read summary!
              </p>
              <MotionButton
                className="group flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </MotionButton>
            </div>
          </MotionDiv>

          {/* Right Side - Links & Features */}
          <MotionDiv variants={itemVariants} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              
              {/* Product Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                <div className="space-y-3">
                  {['Features', 'Pricing', 'API', 'Integrations'].map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transition-transform"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                <div className="space-y-3">
                  {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block text-gray-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transition-transform"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Highlight */}
            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <h4 className="text-lg font-semibold text-white">Why Choose Gistly?</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>✨ AI-powered summarization</p>
                <p>⚡ Lightning-fast processing</p>
                <p>🎨 Beautiful, shareable summaries</p>
                <p>📱 Works on any device</p>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Bottom Section */}
        <MotionDiv
          variants={itemVariants}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              <span>by Parth Sharma</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Mail, href: "#", label: "Email" }
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Copyright Text */}
            <p className="text-gray-400 text-sm">
              © 2025 Gistly. All rights reserved.
            </p>
          </div>
        </MotionDiv>

        {/* Floating Action Button */}
        <div
          className="fixed bottom-8 right-8 z-20"
        >
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/30 hover:scale-110 hover:rotate-12 transition-all duration-300"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </MotionDiv>
    </footer>
  );
}