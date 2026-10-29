# postcards-from-my-jungle

Postcards from My Jungle

Postcards from My Jungle is an imaginary ecosystem composed of 16 fictional creatures, each with its own image, sound, and fictional language. The project explores how generative models can create an alternative natural world by combining visual, auditory, and linguistic elements. The goal was to create creatures that feel unfamiliar and abstract rather than clearly recognizable animals.

For the images, I trained a diffusion model using a dataset of zebra images. I chose zebras as a starting point because their distinctive patterns could help produce unusual visual results. Initially, the generated images did not contain recognizable animal forms. I iterated on the process until the outputs began to resemble zebras, then continued experimenting to achieve more abstract and ambiguous creatures. I wanted the images to suggest possible life forms without defining exactly what each creature was and to use the sound to give a more clear idea of each creature.

I used Stable Audio to generate 16 distinct sounds, one for each creature. My first attempts often produced dramatic music rather than isolated animal-like sounds. I refined the prompts by explicitly requesting no background music or accompaniment, focusing instead on individual creature sounds. This iterative process helped bring the audio closer to the intended fictional ecosystem.

I used a pretrained Qwen transformer model to generate 16 fictional expressions and their meanings. These were saved in a JSON file and connected to the website so that each creature displays its own phrase and translation.

The quality of the images could be improved by training on a larger and more varied dataset, adjusting the training parameters, and experimenting with additional iterations. The sounds could be improved through more precise prompts, greater variation in duration and texture, and further refinement to reduce unwanted musical elements. More experimentation with the language model could also produce a more consistent vocabulary and grammar across the fictional language.

AI Assistance

I used Gemini assistant for assistance with coding, troubleshooting all throughout the assignment.
