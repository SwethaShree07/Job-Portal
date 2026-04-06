const storageKey = 'jobPortalSavedJobs';
const jobs = [
    {
        id: 'job1',
        title: 'Senior Frontend Engineer',
        company: 'Luna Labs',
        location: 'Remote',
        salary: '$140k - $165k',
        experience: '5+ years',
        type: 'Remote',
        postedDate: '2026-04-04',
        tags: ['Design Systems', 'React', 'UI'],
        skills: ['TypeScript', 'React', 'CSS', 'Figma'],
        description: 'Build sleek, high-performance user interfaces for enterprise products and platforms.',
        responsibilities: [
            'Lead frontend architecture and performance optimizations.',
            'Collaborate with product and design teams to ship polished experiences.',
            'Mentor engineering peers on best practices and code quality.',
        ],
        requirements: [
            '5+ years building modern web applications.',
            'Deep knowledge of TypeScript and React.',
            'Proven experience with responsive design and animation techniques.',
        ],
        logo: 'LL',
    },
    {
        id: 'job2',
        title: 'Product Marketing Manager',
        company: 'SparkShift',
        location: 'New York, NY',
        salary: '$110k - $130k',
        experience: '4+ years',
        type: 'Hybrid',
        postedDate: '2026-04-02',
        tags: ['Strategy', 'Growth', 'Analytics'],
        skills: ['Market research', 'Campaign strategy', 'Storytelling'],
        description: 'Own go-to-market planning and launch execution for new product lines.',
        responsibilities: [
            'Define positioning and messaging for new launches.',
            'Partner with sales, content, and product teams.',
            'Track campaign KPIs and improve activation.',
        ],
        requirements: [
            'Experience in SaaS or digital product marketing.',
            'Excellent communication and cross-functional leadership.',
        ],
        logo: 'SS',
    },
    {
        id: 'job3',
        title: 'Data Science Lead',
        company: 'Nova Analytics',
        location: 'San Francisco, CA',
        salary: '$165k - $190k',
        experience: '6+ years',
        type: 'Onsite',
        postedDate: '2026-03-29',
        tags: ['Machine Learning', 'AI', 'Modeling'],
        skills: ['Python', 'TensorFlow', 'SQL', 'Data visualization'],
        description: 'Drive predictive modeling and advanced analytics for customer-facing products.',
        responsibilities: [
            'Build and validate machine learning models.',
            'Translate business questions into data-driven solutions.',
            'Present findings to senior leadership.',
        ],
        requirements: [
            'Strong statistical and ML expertise.',
            'Track record of delivering analytics products.',
        ],
        logo: 'NA',
    },
    {
        id: 'job4',
        title: 'UX Researcher',
        company: 'BrightPath',
        location: 'Austin, TX',
        salary: '$94k - $115k',
        experience: '3+ years',
        type: 'Hybrid',
        postedDate: '2026-04-05',
        tags: ['Research', 'User Testing', 'Experience'],
        skills: ['Interviewing', 'Testing', 'Quantitative research'],
        description: 'Lead customer discovery and usability research across product lines.',
        responsibilities: [
            'Plan and conduct user interviews and usability studies.',
            'Turn observations into design recommendations.',
            'Support product teams with research insights.',
        ],
        requirements: [
            'Experience running qualitative and quantitative studies.',
            'Excellent storytelling and presentation skills.',
        ],
        logo: 'BP',
    },
    {
        id: 'job5',
        title: 'Full-Stack Developer',
        company: 'AtlasOne',
        location: 'Remote',
        salary: '$120k - $145k',
        experience: '4+ years',
        type: 'Remote',
        postedDate: '2026-04-06',
        tags: ['Node.js', 'React', 'Cloud'],
        skills: ['Node.js', 'React', 'AWS', 'GraphQL'],
        description: 'Develop product features across backend services and frontend interfaces.',
        responsibilities: [
            'Design APIs and database schemas.',
            'Implement responsive UIs with modern frameworks.',
            'Improve deployment and CI/CD workflows.',
        ],
        requirements: [
            'Full-stack experience on JavaScript platforms.',
            'Comfortable with cloud-native architecture.',
        ],
        logo: 'A1',
    },
    {
        id: 'job6',
        title: 'Customer Success Specialist',
        company: 'PulseCore',
        location: 'Seattle, WA',
        salary: '$82k - $98k',
        experience: '2+ years',
        type: 'Onsite',
        postedDate: '2026-03-31',
        tags: ['Customer care', 'Retention', 'SaaS'],
        skills: ['CRM', 'Communication', 'Problem solving'],
        description: 'Support customer growth and help clients get maximum value from the product.',
        responsibilities: [
            'Guide customers through onboarding and adoption.',
            'Resolve escalations with empathy and speed.',
            'Collect feedback for product improvements.',
        ],
        requirements: [
            'Strong communication and relationship-building skills.',
            'Experience with SaaS support or success roles.',
        ],
        logo: 'PC',
    },
];
const elements = {
    jobGrid: document.getElementById('jobGrid'),
    savedList: document.getElementById('savedList'),
    companySelector: document.getElementById('companySelector'),
    roleSelector: document.getElementById('roleSelector'),
    companyDropdown: document.getElementById('companyDropdown'),
    roleDropdown: document.getElementById('roleDropdown'),
    postedSelect: document.getElementById('postedSelect'),
    keywordInput: document.getElementById('keywordInput'),
    sortSelect: document.getElementById('sortSelect'),
    resultSummary: document.getElementById('resultSummary'),
    jobCount: document.getElementById('jobCount'),
    savedCount: document.getElementById('savedCount'),
    jobTypeButtons: document.getElementById('jobTypeButtons'),
    clearFilters: document.getElementById('clearFilters'),
    toast: document.getElementById('toast'),
    applicationModal: document.getElementById('applicationModal'),
    modalBackdrop: document.getElementById('modalBackdrop'),
    modalClose: document.getElementById('modalClose'),
    applicationForm: document.getElementById('applicationForm'),
    modalJobTitle: document.getElementById('modalJobTitle'),
    modalJobId: document.getElementById('modalJobId'),
    applicantName: document.getElementById('applicantName'),
    applicantEmail: document.getElementById('applicantEmail'),
    applicantPhone: document.getElementById('applicantPhone'),
    applicantExperience: document.getElementById('applicantExperience'),
    applicantMessage: document.getElementById('applicantMessage'),
    modalCancel: document.getElementById('modalCancel'),
};
const state = {
    keyword: '',
    company: '',
    role: '',
    postedRange: 'all',
    jobType: 'All',
    sortBy: 'latest',
    saved: loadSavedJobs(),
};
function loadSavedJobs() {
    try {
        const payload = window.localStorage.getItem(storageKey);
        return payload ? JSON.parse(payload) : [];
    }
    catch (_a) {
        return [];
    }
}
function persistSavedJobs() {
    window.localStorage.setItem(storageKey, JSON.stringify(state.saved));
}
function isJobSaved(jobId) {
    return state.saved.includes(jobId);
}
const companies = Array.from(new Set(jobs.map((job) => job.company))).sort();
const roles = Array.from(new Set(jobs.map((job) => job.title))).sort();

function renderOptions() {
    // no native select rendering needed for custom dropdowns
}
function renderDropdownOptions(type) {
    const dropdown = type === 'company' ? elements.companyDropdown : elements.roleDropdown;
    if (!dropdown)
        return;
    const options = type === 'company'
        ? companies
        : roles;
    dropdown.innerHTML = `
        <div class="custom-dropdown-items">
          ${options.map((value) => `<button type="button" class="custom-dropdown-item" data-type="${type}" data-value="${value}">${value}</button>`).join('')}
        </div>
    `;
    dropdown.classList.remove('hidden');
    dropdown.querySelectorAll('.custom-dropdown-item').forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (!value)
                return;
            if (type === 'company') {
                state.company = value;
                const display = elements.companySelector?.querySelector('.select-value');
                if (display)
                    display.textContent = value;
            }
            else {
                state.role = value;
                const display = elements.roleSelector?.querySelector('.select-value');
                if (display)
                    display.textContent = value;
            }
            renderJobs();
            hideDropdown();
        });
    });
}
function showDropdown(type) {
    hideDropdown();
    renderDropdownOptions(type);
}
function hideDropdown() {
    if (elements.companyDropdown) {
        elements.companyDropdown.classList.add('hidden');
        elements.companyDropdown.innerHTML = '';
    }
    if (elements.roleDropdown) {
        elements.roleDropdown.classList.add('hidden');
        elements.roleDropdown.innerHTML = '';
    }
}
function createJobCard(job) {
    const card = document.createElement('article');
    card.className = 'job-card';
    const recent = isRecentlyPosted(job.postedDate);
    const saved = isJobSaved(job.id);
    card.innerHTML = `
    <div class="job-card-header">
      <div class="company-badge">
        <span class="company-logo">${job.logo}</span>
        <div>
          <div class="job-title">${job.title}</div>
          <div class="job-meta">${job.company}</div>
        </div>
      </div>
      <button class="save-button ${saved ? 'saved' : ''}" data-save-id="${job.id}">${saved ? 'Saved' : 'Save'}</button>
    </div>
    <div class="job-meta">
      <span>${job.location}</span>
      <span>${job.experience}</span>
      <span>${job.salary}</span>
      <span class="badge">${job.type}</span>
      ${recent ? '<span class="badge recent">New</span>' : ''}
    </div>
    <div class="job-details">${job.description}</div>
    <div class="tags-grid">
      ${job.tags.map((tag) => `<span class="badge">${tag}</span>`).join('')}
    </div>
    <div class="skills-grid">
      ${job.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join('')}
    </div>
    <div class="details-list">
      <strong>Responsibilities</strong>
      <ul>${job.responsibilities.map((item) => `<li>${item}</li>`).join('')}</ul>
      <strong>Requirements</strong>
      <ul>${job.requirements.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="job-card-actions">
      <button class="action-button" data-apply-id="${job.id}">Apply Now</button>
      <span class="job-meta">Posted ${formatRelativeDate(job.postedDate)}</span>
    </div>
  `;
    return card;
}
function renderJobs() {
    const filtered = jobs
        .filter(filterByKeyword)
        .filter(filterByCompany)
        .filter(filterByRole)
        .filter(filterByType)
        .filter(filterByPostedRange)
        .sort(sortJobs);
    elements.jobGrid.innerHTML = '';
    if (filtered.length === 0) {
        elements.jobGrid.innerHTML = '<div class="empty-state">No jobs match the selected filters. Try resetting or broadening your search.</div>';
    }
    else {
        filtered.forEach((job) => {
            elements.jobGrid.appendChild(createJobCard(job));
        });
    }
    elements.resultSummary.textContent = `Showing ${filtered.length} of ${jobs.length} jobs`;
    elements.jobCount.textContent = String(filtered.length);
    attachCardListeners();
}
function filterByKeyword(job) {
    if (!state.keyword)
        return true;
    const query = state.keyword.toLowerCase();
    return [job.title, job.company, job.location, job.description].concat(job.tags, job.skills).some((text) => text.toLowerCase().includes(query));
}
function filterByCompany(job) {
    return !state.company || job.company === state.company;
}
function filterByRole(job) {
    return !state.role || job.title === state.role;
}
function filterByPostedRange(job) {
    if (state.postedRange === 'all') return true;
    const days = Number(state.postedRange);
    const posted = new Date(job.postedDate).getTime();
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return posted >= cutoff;
}
function filterByType(job) {
    return state.jobType === 'All' || job.type === state.jobType;
}
function sortJobs(a, b) {
    if (state.sortBy === 'latest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
    const salaryValue = (salary) => Number(salary.replace(/[^0-9]/g, ''));
    if (state.sortBy === 'salaryHigh') {
        return salaryValue(b.salary) - salaryValue(a.salary);
    }
    return salaryValue(a.salary) - salaryValue(b.salary);
}
function formatRelativeDate(rawDate) {
    const date = new Date(rawDate);
    const diffDays = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0)
        return 'today';
    if (diffDays === 1)
        return '1 day ago';
    return `${diffDays} days ago`;
}
function isRecentlyPosted(rawDate) {
    const date = new Date(rawDate);
    const diffHours = (Date.now() - date.getTime()) / (1000 * 60 * 60);
    return diffHours <= 96;
}
function attachCardListeners() {
    document.querySelectorAll('[data-save-id]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-save-id');
            if (id)
                toggleSaved(id);
        });
    });
    document.querySelectorAll('[data-apply-id]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-apply-id');
            if (id)
                openApplicationModal(id);
        });
    });
}
function openApplicationModal(jobId) {
    const job = jobs.find((job) => job.id === jobId);
    if (!job || !elements.applicationModal)
        return;
    if (elements.modalJobTitle)
        elements.modalJobTitle.textContent = job.title;
    if (elements.modalJobId)
        elements.modalJobId.value = jobId;
    if (elements.applicantName)
        elements.applicantName.value = '';
    if (elements.applicantEmail)
        elements.applicantEmail.value = '';
    if (elements.applicantPhone)
        elements.applicantPhone.value = '';
    if (elements.applicantExperience)
        elements.applicantExperience.value = '';
    if (elements.applicantMessage)
        elements.applicantMessage.value = '';
    elements.applicationModal.classList.remove('hidden');
}
function closeApplicationModal() {
    if (elements.applicationModal)
        elements.applicationModal.classList.add('hidden');
}
function attachApplicationHandlers() {
    elements.modalClose?.addEventListener('click', closeApplicationModal);
    elements.modalBackdrop?.addEventListener('click', closeApplicationModal);
    elements.modalCancel?.addEventListener('click', closeApplicationModal);
    elements.applicationForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!elements.applicantName || !elements.applicantEmail || !elements.applicantPhone || !elements.applicantExperience)
            return;
        const name = elements.applicantName.value.trim();
        const email = elements.applicantEmail.value.trim();
        const phone = elements.applicantPhone.value.trim();
        const experience = elements.applicantExperience.value.trim();
        if (!name || !email || !phone || !experience) {
            showToast('Please complete all required fields.');
            return;
        }
        const jobTitle = elements.modalJobTitle?.textContent || 'this role';
        closeApplicationModal();
        showToast(`Applied successfully for ${jobTitle}`);
    });
}
function toggleSaved(jobId) {
    if (isJobSaved(jobId)) {
        state.saved = state.saved.filter((id) => id !== jobId);
        showToast('Removed from saved jobs');
    }
    else {
        state.saved.push(jobId);
        showToast('Saved job for later');
    }
    persistSavedJobs();
    renderJobs();
    renderSavedJobs();
}
function renderSavedJobs() {
    elements.savedList.innerHTML = '';
    const savedJobs = jobs.filter((job) => isJobSaved(job.id));
    elements.savedCount.textContent = String(savedJobs.length);
    if (savedJobs.length === 0) {
        elements.savedList.innerHTML = '<div class="empty-state">No saved jobs yet. Click Save on a role to bookmark it.</div>';
        return;
    }
    savedJobs.forEach((job) => {
        const item = document.createElement('article');
        item.className = 'saved-job-card';
        item.innerHTML = `
      <div class="saved-job-header">
        <div>
          <strong>${job.title}</strong>
          <div class="job-meta">${job.company} • ${job.location}</div>
        </div>
        <button class="save-button saved" data-remove-id="${job.id}">Remove</button>
      </div>
      <div class="job-meta">${job.type} • ${job.salary}</div>
    `;
        elements.savedList.appendChild(item);
    });
    document.querySelectorAll('[data-remove-id]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-remove-id');
            if (id)
                toggleSaved(id);
        });
    });
}
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('visible');
    setTimeout(() => {
        elements.toast.classList.remove('visible');
    }, 2100);
}
function updateJobTypeButtons() {
    elements.jobTypeButtons.querySelectorAll('.type-button').forEach((button) => {
        if (button.dataset.type === state.jobType) {
            button.classList.add('active');
        }
        else {
            button.classList.remove('active');
        }
    });
}
function resetFilters() {
    state.keyword = '';
    state.company = '';
    state.role = '';
    state.postedRange = 'all';
    state.jobType = 'All';
    state.sortBy = 'latest';
    elements.keywordInput.value = '';
    if (elements.companySelector) {
        const companyDisplay = elements.companySelector.querySelector('.select-value');
        if (companyDisplay)
            companyDisplay.textContent = 'All companies';
    }
    if (elements.roleSelector) {
        const roleDisplay = elements.roleSelector.querySelector('.select-value');
        if (roleDisplay)
            roleDisplay.textContent = 'All roles';
    }
    elements.postedSelect.value = 'all';
    elements.sortSelect.value = 'latest';
    updateJobTypeButtons();
    renderJobs();
}
function attachControls() {
    elements.keywordInput.addEventListener('input', (event) => {
        state.keyword = event.target.value.trim();
        renderJobs();
    });
    elements.companySelector.addEventListener('click', () => showDropdown('company'));
    elements.companySelector.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showDropdown('company');
        }
    });
    elements.roleSelector.addEventListener('click', () => showDropdown('role'));
    elements.roleSelector.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showDropdown('role');
        }
    });
    elements.postedSelect.addEventListener('focus', () => hideDropdown());
    elements.postedSelect.addEventListener('change', (event) => {
        state.postedRange = event.target.value;
        renderJobs();
    });
    elements.sortSelect.addEventListener('focus', () => hideDropdown());
    elements.sortSelect.addEventListener('change', (event) => {
        state.sortBy = event.target.value;
        renderJobs();
    });
    elements.jobTypeButtons.querySelectorAll('.type-button').forEach((button) => {
        button.addEventListener('click', () => {
            state.jobType = button.dataset.type;
            updateJobTypeButtons();
            renderJobs();
            hideDropdown();
        });
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node))
            return;
        const companyField = elements.companySelector;
        const roleField = elements.roleSelector;
        const companyDropdown = elements.companyDropdown;
        const roleDropdown = elements.roleDropdown;
        if ((companyField && companyField.contains(target)) || (roleField && roleField.contains(target)) ||
            (companyDropdown && companyDropdown.contains(target)) || (roleDropdown && roleDropdown.contains(target))) {
            return;
        }
        hideDropdown();
    });
    elements.clearFilters.addEventListener('click', () => {
        resetFilters();
        hideDropdown();
    });
}
function initialize() {
    renderOptions();
    hideDropdown();
    attachControls();
    attachApplicationHandlers();
    renderJobs();
    renderSavedJobs();
}
initialize();
