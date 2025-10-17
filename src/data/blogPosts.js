export const blogPosts = [
  {
    id: "gnn-ceramicmap",
    projectId: 1,
    title: "Mapping Ceramic Defects with Graph Neural Networks",
    publishedAt: "March 12, 2024",
    readTime: "7 min read",
    excerpt:
      "A look at how I designed a distance-aware graph convolutional network that outperformed traditional atomistic energy predictors on ceramic datasets.",
    tags: ["Machine Learning", "Graph Neural Networks", "Materials"],
    sections: [
      {
        heading: "Why I Built It",
        body: [
          "Most atomic energy prediction pipelines lean heavily on handcrafted features or rely on models that treat atoms in isolation. I wanted to capture local environments and geometric relationships directly from the data, so I explored a graph neural network approach tailored to ceramics.",
        ],
      },
      {
        heading: "Designing the Model",
        body: [
          "Each atom becomes a node with learned embeddings and physics-motivated attributes. Edges connect spatial neighbors, and I inject the interatomic distance as an edge feature. I then created a custom graph convolution layer that weights messages by learned distance kernels.",
          "Training on the Materials Project dataset meant dealing with noisy measurements and an imbalanced distribution of crystal structures. I mitigated this by applying focal loss and augmenting under-represented classes with symmetry-aware perturbations.",
        ],
      },
      {
        heading: "Results",
        body: [
          "The model beat two baselines (a vanilla GCN and the N2P2 descriptor pipeline) by 8.2% on MAE. More importantly, it generalized to previously unseen lattices with consistent uncertainty estimates. Visualizing attention weights confirmed the network leaned on the same atoms a domain expert would inspect.",
        ],
      },
    ],
    takeaways: [
      "Edge-aware message passing captures subtle structural cues that handcrafted features miss.",
      "Physics-inspired augmentations prevent the model from overfitting to a handful of well-known lattices.",
      "Uncertainty calibration is essential for scientific ML deployments.",
    ],
  },
  {
    id: "3d-ray-tracer",
    projectId: 2,
    title: "Tracing Rays the Hard Way in Pure C",
    publishedAt: "February 2, 2024",
    readTime: "6 min read",
    excerpt:
      "Rebuilding the fundamentals of a ray tracer from scratch to sharpen my math and systems chops—no external rendering libraries allowed.",
    tags: ["Graphics", "C", "Rendering"],
    sections: [
      {
        heading: "Motivation",
        body: [
          "I wanted a project that forced me to revisit vector math and low-level performance decisions. Writing a ray tracer without helper libraries delivers exactly that: a tight feedback loop between theory and implementation.",
        ],
      },
      {
        heading: "Core Features",
        body: [
          "The renderer handles ray–sphere intersections, Lambertian shading, and hard shadows. I implemented recursive ray bouncing for reflections and stratified sampling for a simple anti-aliasing pass.",
          "All assets are generated procedurally. The scene description is compact, and color values are mapped directly into a portable pixmap (PPM) so the entire render pipeline stays transparent.",
        ],
      },
      {
        heading: "Optimizations",
        body: [
          "Profiling revealed that repeated random number generation dominated runtime, so I added a lightweight Xorshift RNG.",
          "I also staged ray computations in contiguous buffers to play nicely with the CPU cache, shaving ~18% off render time for a 800×400 scene.",
        ],
      },
    ],
    takeaways: [
      "You understand the graphics pipeline more deeply when you rebuild it yourself.",
      "Deterministic builds are invaluable when debugging color banding artifacts.",
      "A well-chosen RNG can be just as important as a new shading model.",
    ],
  },
  {
    id: "emotilog",
    projectId: 3,
    title: "Designing EmotiLog: Mood Tracking That Actually Fits Daily Life",
    publishedAt: "April 4, 2024",
    readTime: "5 min read",
    excerpt:
      "Translating behavioral science research into a tap-friendly Android app that logs emotions without friction.",
    tags: ["Android", "Firebase", "UX"],
    sections: [
      {
        heading: "Problem Statement",
        body: [
          "Most mood trackers demand too much typing, which drives drop-off. I wanted EmotiLog to let users log an entry in under five seconds, or not at all.",
        ],
      },
      {
        heading: "Implementation",
        body: [
          "The home screen presents six emotion categories as large touch targets. Tapping one records the timestamp, emotion, and an optional note that expands only if the user wants to elaborate.",
          "Firebase Authentication keeps onboarding light, while Firestore stores entries in a structure optimized for weekly summaries. Cloud Functions generate aggregate stats so the app stays responsive on low-end devices.",
        ],
      },
      {
        heading: "User Feedback",
        body: [
          "Testers reported that the color-coded timeline helped them notice trends quickly. One user called out that logging from the notification shade felt effortless, which validated the five-second design constraint.",
        ],
      },
    ],
    takeaways: [
      "Reducing modal interactions makes mood tracking sustainable.",
      "Serverless analytics are good enough for lightweight behavioral insights.",
      "Thoughtful defaults beat feature creep for wellness apps.",
    ],
  },
];
