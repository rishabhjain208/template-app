const fs = require('fs-extra');
const path = require('path');

// Export template as JSON
exports.exportTemplate = async (req, res) => {
  try {
    const { templateName, textBoxes } = req.body;

    if (!templateName || !textBoxes) {
      return res.status(400).json({ status: 'error', message: 'Template name and textBoxes are required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: 'error', message: 'At least one image is required' });
    }

    const images = req.files.map(file => file.path);
    const template = {
      templateName,
      textBoxes: JSON.parse(textBoxes),
      images
    };

    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.json`);
    await fs.outputJson(templatePath, template, { spaces: 2 });

    res.status(201).json({ status: 'success', message: 'Template exported successfully', templatePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to export template', error: error.message });
  }
};

// Import template
exports.importTemplate = async (req, res) => {
  try {
    const { templateName } = req.params;

    if (!templateName) {
      return res.status(400).json({ status: 'error', message: 'Template name is required' });
    }

    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.json`);
    if (!(await fs.pathExists(templatePath))) {
      return res.status(404).json({ status: 'error', message: 'Template not found' });
    }

    const template = await fs.readJson(templatePath);
    res.status(200).json({ status: 'success', message: 'Template imported successfully', template });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to import template', error: error.message });
  }
};

// Fill template with parameters
exports.fillTemplate = async (req, res) => {
  try {
    const { templateName, textBoxValues, imageReplacements } = req.body;

    if (!templateName) {
      return res.status(400).json({ status: 'error', message: 'Template name is required' });
    }

    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.json`);
    if (!(await fs.pathExists(templatePath))) {
      return res.status(404).json({ status: 'error', message: 'Template not found' });
    }

    const template = await fs.readJson(templatePath);

    // Replace text boxes
    if (textBoxValues) {
      template.textBoxes.forEach(box => {
        if (textBoxValues[box.id]) box.value = textBoxValues[box.id];
      });
    }

    // Replace images
    if (imageReplacements) {
      template.images = template.images.map((imgPath, idx) => imageReplacements[idx] || imgPath);
    }

    res.status(200).json({ status: 'success', message: 'Template filled successfully', template });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fill template', error: error.message });
  }
};
