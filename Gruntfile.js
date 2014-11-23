var path = require('path');

module.exports = function(grunt) {

	var includePaths = require('node-bourbon').includePaths;
	includePaths.push(path.join(__dirname, 'public/components'));

	// Project configuration.
	var config = {
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: includePaths,
				sourceComments: 'normal'
			},
			all: {
				expand: true,
				cwd: 'public/scss',
				src: ['*.scss'],
				dest: 'public/dist/css',
				ext: '.css'
			}
		},

		browserify: {
			options: {
				transform: [
					require('grunt-react').browserify
				]
			},
			app: {
				src: 'public/js/init.jsx',
				dest: 'public/dist/js/app.js'
			}
		},
		
		copy: {
			build: {
				expand: true,
		    cwd: 'public/dist/',
		    src: '**',
		    dest: 'v_ift/www/',
			}
		},

		watch: {
			css: {
				files: ['public/scss/**/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['public/js/**/*.js*'],
				tasks: ['browserify']
			}
		}

	};

	grunt.initConfig(config);

	grunt.registerTask('default', [], function () {
		grunt.loadNpmTasks('grunt-sass');
		grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.task.run('sass:all');
		grunt.task.run('browserify:app');
		grunt.task.run('watch');
	});
	
	grunt.registerTask('build', [], function(){
		grunt.loadNpmTasks('grunt-sass');
		grunt.loadNpmTasks('grunt-browserify');
		grunt.loadNpmTasks('grunt-contrib-copy');
		
		
		grunt.task.run('sass:all');
		grunt.task.run('browserify');
		grunt.task.run('copy:build');
	});

	grunt.registerTask('sass', [], function () {
		grunt.loadNpmTasks('grunt-sass');
		grunt.task.run('sass:all');
	});

	grunt.registerTask('browserify', [], function () {
		grunt.loadNpmTasks('grunt-browserify');
		grunt.task.run('browserify');
	});

};
