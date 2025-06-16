import { Link } from 'react-router-dom'
import { FiEdit3, FiLayout, FiSmartphone, FiLock } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <div className="responsive-container">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                Capture your thoughts with elegance
              </h1>
              <p className="mt-6 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-xl">
                MiNote gives you a beautiful place to store your ideas, memories, and knowledge. Simple, powerful, and delightful.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn btn-primary text-center px-8 py-3 rounded-lg">
                  Get Started — Free
                </Link>
                <Link to="/login" className="btn btn-neutral text-center px-8 py-3 rounded-lg">
                  Sign In
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-elevated max-w-lg mx-auto">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium text-xs mr-3">M</div>
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-700 h-6 rounded"></div>
                  </div>
                  <div className="bg-neutral-100 dark:bg-neutral-700 h-4 rounded w-3/4"></div>
                  <div className="bg-neutral-100 dark:bg-neutral-700 h-4 rounded"></div>
                  <div className="bg-neutral-100 dark:bg-neutral-700 h-4 rounded w-5/6"></div>
                  <div className="bg-neutral-100 dark:bg-neutral-700 h-4 rounded w-1/2"></div>
                  <div className="mt-6 flex space-x-2">
                    <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 text-xs py-1 px-2 rounded-full">Ideas</div>
                    <div className="bg-secondary-100 dark:bg-secondary-900/40 text-secondary-800 dark:text-secondary-300 text-xs py-1 px-2 rounded-full">Important</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              Everything you need for your notes
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <FiEdit3 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Rich Text Editor</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Format your notes with style. Add headings, lists, and more to organize your thoughts.
              </p>
            </motion.div>

            <motion.div 
              className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-4">
                <FiLayout size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Organize & Find</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Group notes by categories and find them instantly with powerful search.
              </p>
            </motion.div>

            <motion.div 
              className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center text-accent-600 dark:text-accent-400 mb-4">
                <FiSmartphone size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Responsive Design</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Access your notes from any device with our beautiful responsive interface.
              </p>
            </motion.div>

            <motion.div 
              className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 mb-4">
                <FiLock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Secure & Private</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Your notes are encrypted and secure. Only you can access them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 mt-auto">
        <div className="responsive-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start capturing your thoughts today
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">
            Join thousands of users who trust MiNote for their note-taking needs.
          </p>
          <Link to="/register" className="inline-block bg-white text-primary-600 hover:bg-neutral-100 hover:text-primary-700 transition-colors px-8 py-3 rounded-lg font-medium">
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
